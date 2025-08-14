package com.hdfclife.path2prospermicrosite.core.services;

import com.hdfclife.path2prospermicrosite.core.models.HttpAPIResponseModel;
import java.util.Map;

public interface HttpMethodDetailsService {
   HttpAPIResponseModel getHTTPMethodCallWithoutParameter(String var1);

   HttpAPIResponseModel postHTTPMethodCallWithContentTypeJSON(String var1, String var2);

   HttpAPIResponseModel postHTTPMethodCallWithParams(String var1, Map<String, String> var2);
}
