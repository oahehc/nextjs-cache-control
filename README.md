# nextjs-cache-control

<quote>
As a web developer, we spend lots of time minimizing our files and API response in order to allow our customers to have a better user experience. What if we can make it better by reducing the response to just a few hundred bytes or even zero? Implementing a better cache control policy will help us to reach that goal. In this article, I will list a few strategies about how to properly set the response header to allow the browser to handle the cache for us.
</quote>

## Agenda

- [Gotchas](#gatchas)
- [HTTP header - Cache-Control](#cache-control)
- [HTTP header - ETag](#etag)
- [Cache Strategies](#strategies)
- [Benefits](#benefits)

### Gotchas <a name="gatchas"></a>

Before we start, there are a few gotchas I want to point out first.

1. When we are testing our cache setting, pressing "enter" on the address bar rather than refresh page with F5. Because some browsers will send the request with header `Cache-Control max-age=0` and overwrite our cache policy when we refresh the page. Check [here](https://stackoverflow.com/questions/18557251/why-does-browser-still-sends-request-for-cache-control-public-with-max-age) for more information.
2. Not all CDN providers follow the cache-control header (eg. some CDN providers follow `max-age` rather than `s-maxage`), you might want to check with your CDN provider before you start modifying the settings.

### HTTP header - Cache-Control <a name="cache-control"></a>

There are tons of settings for cache-control. To make this article easier to understand, here I only mention the attributes that I'm going to apply to my examples. If you're interested to know more about that. You can check [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) to gain more information.

#### Cacheability

- public: The response can be stored by proxy or browser
- no-cache: The response can be stored by proxy or browser, but the stored response MUST always go through validation with the origin server first before using it.

#### Expiration

- max-age: The maximum amount of time a resource is considered fresh.
- s-maxage: Overrides max-age or the Expires header, but only for shared caches (e.g., proxies).

#### Revalidation and reloading

- must-revalidate: Indicates that once a resource becomes stale, caches must not use their stale copy without successful validation on the origin server.
- immutable: Indicates that the response body will not change over time. The resource, if unexpired, is unchanged on the server and therefore the client should not send a conditional revalidation for it.

### HTTP header - ETag <a name="etag"></a>

The ETag HTTP response header is an identifier for a specific version of a resource. It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content has not changed.

|                      | Request                                 | Response                                                   |
| -------------------- | --------------------------------------- | ---------------------------------------------------------- |
| 1st request          | GET /                                   | 200 OK<br>Cache-Control: max-age=0<br>ETag: W/"a46ba20afd" |
| ETag haven't changed | GET / <br>If-None-Match: W/"a46ba20afd" | 304 Not Modified                                           |
| ETag was changed     | GET / <br>If-None-Match: W/"a46ba20afd" | 200 OK<br>Cache-Control: max-age=0<br>ETag: W/"7a48833148" |

Another use case about `ETag` is avoiding `mid-air collisions`, it's not related to cache control so I won't dive into that. Check [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) if you're interested.

### Cache Strategies <a name="strategies"></a>

Apply cache can not only save the bandwidth but also prevent the latency to allow the user to get the result faster.
But at the same time, we also want to make sure our users can always see the latest version of the application. Therefore, it's extremely important to config the cache control header properly. Normally, we need to base on the type of our pages and files to apply different cache strategies. Here I list a few types of the setting for different scenarios.

#### 1. Always Revalidation

If the page is changed frequently, like the list page for the e-commerce website. Then we should let the user check if there is any new information on every request. Therefore, we can set the cache-control as below.

```
Cache-Control: public, max-age=0, must-revalidate;
```

The behavior will looks like the table below.

|                                        | Request                                 | Response                       |
| -------------------------------------- | --------------------------------------- | ------------------------------ |
| 1st request                            | GET /                                   | 200 OK<br>ETag: W/"a46ba20afd" |
| next request and ETag haven't changed  | GET / <br>If-None-Match: W/"a46ba20afd" | 304 Not Modified               |
| another request after ETag was changed | GET / <br>If-None-Match: W/"a46ba20afd" | 200 OK<br>ETag: W/"7a48833148" |

You can play around with this [demo page](https://nextjs-cache-control.now.sh/list). The `etag` will change every 10 seconds.  
![Always Revalidation](https://i.imgur.com/WTVOBIV.png)

#### 2. Long Term Caching

For some content that is hardly changed, then we can set a longer max-age and add the immutable property. This will allow the browser to use the catch from disk or memory if the age is within the range. Therefore, we can prevent sending an unnecessary request for saving bandwidth and also reduce the latency.

```
Cache-Control: public, max-age=604800, immutable;
```

The behavior will looks like the table below.

|                | Request | Response              |
| -------------- | ------- | --------------------- |
| 1st request    | GET /   | 200 OK                |
| within max-age | N/A     | 200 (from disk cache) |
| over max-age   | GET /   | 200 OK                |

You can play around with this [demo page](https://nextjs-cache-control.now.sh/tos). The `max-age` is 30 seconds.  
![Long Term Caching](https://i.imgur.com/wcN4PrT.png)

`Long Term Caching` is suited for static files like javascript, css, or images. But what if we need to change it within the max-age? Normally, when we apply the `Long Term Caching`, we will add a hash string into the file name (eg. filename.[hash].js), So we can force the browser request the new file when we change the content.

### Benefits <a name="benefits"></a>

Now let's talk about the benefits of cache-control. The biggest reward will be the cost-saving on the bandwidth. In reference to [AWS CloudFront](https://aws.amazon.com/cloudfront/pricing/?nc1=h_ls), the transmission cost is around \$ 0.1/GB. But how much bandwidth can we save after applying a different cache-control policy?

#### 1. Always Revalidation

If we apply the `Always Revalidation` policy, our server will respond 304 rather than the full content if the browser already has the latest content and the content isn't changed. Therefore, the bandwidth we can save is based on how many users will revisit the website and how often the content changes.

For example, if our website's content changes once per week. And every week, about 10% of pageview is coming from the revisit user. Then the total bandwidth we can save will be around 10% (if we ignore 304 response size).

#### 2. Long Term Caching

If we apply the `Long Term Caching` policy, the browser will use the cache directly without sending the validating request. So we save more bandwidth. The drawback is that we will have to change the file name if we need to change the content within the cache time (max-age).

#### Example

If you still feel a little confused about cache-control, let me try to explain in an example.
If our website has only one page. It contents one html, one css and one javascript file. And Bob is our loyal user who needs to reference the information on our website every day.

1. The content change about one time per week (change html)
2. We release a new version every week (change html, css, js)
3. We upgrade third party libraries every half year (change js )

The table below is how many times Bob needs to download our files in a year. We can see how much bandwidth we can save after applying a better cache-control policy.

|            |  size | without cache  | Always Revalidation | Long Term Caching |
| ---------- | ----: | :------------: | :-----------------: | :---------------: |
| index.html |  50KB |     \*365      |        \*52         |       \*52        |
| index.css  |  50KB |     \*365      |        \*52         |       \*12        |
| index.js   | 100KB |     \*365      |        \*52         |       \*12        |
| Total      |       | 71.29MB (100%) |   10.16MB (14.2%)   |    4.3MB (6%)     |

Moreover, because we only update third party libraries twice per year, so if we separate our javascript file into two files, one is our own script - main.js, another is third party library - vendor.js. Then we will be able to save more bandwidth. You can search `code-splitting` to get more information about it.

|            |      | Long Term Caching + code splitting |
| ---------- | ---: | :--------------------------------: |
| index.html | 50KB |                \*52                |
| index.css  | 50KB |                \*12                |
| main.js    | 50KB |                \*12                |
| vendor.js  | 50KB |                \*2                 |
| Total      |      |            3.8MB (5.3%)            |

---

## Conclusion

That's all. Thanks for reading, I hope this article can help you have a better understanding of cache-control.

--

## Reference

- [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)
- [Keeping things fresh with stale-while-revalidate](https://web.dev/stale-while-revalidate/)
- [HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- [Long Term Caching](https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching)
- [Why does Browser still sends request for cache-control public with max-age?](https://stackoverflow.com/questions/18557251/why-does-browser-still-sends-request-for-cache-control-public-with-max-age)
