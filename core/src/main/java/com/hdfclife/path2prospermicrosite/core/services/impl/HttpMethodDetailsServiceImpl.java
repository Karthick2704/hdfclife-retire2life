/* Decompiler 50ms, total 415ms, lines 134 */
package com.hdfclife.path2prospermicrosite.core.services.impl;

import com.hdfclife.path2prospermicrosite.core.models.HttpAPIResponseModel;
import com.hdfclife.path2prospermicrosite.core.services.HdfcLifeLoggerService;
import com.hdfclife.path2prospermicrosite.core.services.HttpMethodDetailsService;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(
   service = {HttpMethodDetailsService.class},
   immediate = true
)
public class HttpMethodDetailsServiceImpl implements HttpMethodDetailsService {
   @Reference
   HdfcLifeLoggerService hdfcLifeLoggerService;
   @Reference
   private HttpClientBuilderFactory httpClientBuilderFactory;
   private Logger logger = LoggerFactory.getLogger(this.getClass());

   public HttpAPIResponseModel getHTTPMethodCallWithoutParameter(String url) {
      HttpAPIResponseModel httpAPIResponseModel = new HttpAPIResponseModel();

      try {
         HttpClientBuilder builder = this.httpClientBuilderFactory.newBuilder();
         RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(5000).setSocketTimeout(5000).build();
         builder.setDefaultRequestConfig(requestConfig);
         HttpClient client = builder.build();
         HttpGet getRequest = new HttpGet(url);
         HttpResponse httpResponse = client.execute(getRequest);
         int statusCode = httpResponse.getStatusLine().getStatusCode();
         httpAPIResponseModel.setStatusCode(statusCode);
         BufferedReader br = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent()));

         String output;
         String responseJsonString;
         for(responseJsonString = ""; (output = br.readLine()) != null; responseJsonString = responseJsonString + output) {
         }

         httpAPIResponseModel.setResponse(responseJsonString);
      } catch (IOException | RuntimeException var12) {
         this.logger.error("Exception-" + var12.toString());
         this.hdfcLifeLoggerService.loggerException(var12);
      }

      return httpAPIResponseModel;
   }

   public HttpAPIResponseModel postHTTPMethodCallWithContentTypeJSON(String url, String requestJSONData) {
      HttpAPIResponseModel httpAPIResponseModel = new HttpAPIResponseModel();

      try {
         HttpClientBuilder builder = this.httpClientBuilderFactory.newBuilder();
         RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(5000).setSocketTimeout(5000).build();
         builder.setDefaultRequestConfig(requestConfig);
         HttpClient client = builder.build();
         HttpPost postRequest = new HttpPost(url);
         StringEntity input = new StringEntity(requestJSONData);
         input.setContentType("application/json");
         postRequest.setEntity(input);
         HttpResponse httpResponse = client.execute(postRequest);
         int statusCode = httpResponse.getStatusLine().getStatusCode();
         httpAPIResponseModel.setStatusCode(statusCode);
         BufferedReader br = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent()));

         String output;
         String responseJsonString;
         for(responseJsonString = ""; (output = br.readLine()) != null; responseJsonString = responseJsonString + output) {
         }

         httpAPIResponseModel.setResponse(responseJsonString);
      } catch (IOException | RuntimeException var14) {
         this.hdfcLifeLoggerService.loggerException(var14);
      }

      return httpAPIResponseModel;
   }

   public HttpAPIResponseModel postHTTPMethodCallWithParams(String url, Map<String, String> params) {
      HttpAPIResponseModel httpAPIResponseModel = new HttpAPIResponseModel();

      try {
         HttpClientBuilder builder = this.httpClientBuilderFactory.newBuilder();
         RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(5000).setSocketTimeout(5000).build();
         builder.setDefaultRequestConfig(requestConfig);
         HttpClient client = builder.build();
         HttpPost postRequest = new HttpPost(url);
         ArrayList<NameValuePair> apiParams = new ArrayList();
         Iterator var9 = params.entrySet().iterator();

         while(var9.hasNext()) {
            Entry<String, String> entry = (Entry)var9.next();
            apiParams.add(new BasicNameValuePair((String)entry.getKey(), (String)entry.getValue()));
         }

         postRequest.setEntity(new UrlEncodedFormEntity(apiParams, "UTF8"));
         HttpResponse httpResponse = client.execute(postRequest);
         int statusCode = httpResponse.getStatusLine().getStatusCode();
         httpAPIResponseModel.setStatusCode(statusCode);
         BufferedReader br = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent()));

         String output;
         String responseJsonString;
         for(responseJsonString = ""; (output = br.readLine()) != null; responseJsonString = responseJsonString + output) {
         }

         httpAPIResponseModel.setResponse(responseJsonString);
      } catch (IOException | RuntimeException var14) {
         this.hdfcLifeLoggerService.loggerException(var14);
      }

      return httpAPIResponseModel;
   }
}
