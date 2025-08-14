/* Decompiler 26ms, total 368ms, lines 55 */
package com.hdfclife.path2prospermicrosite.core.services.impl;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.hdfclife.path2prospermicrosite.core.models.HttpAPIResponseModel;
import com.hdfclife.path2prospermicrosite.core.services.HdfcLifeLoggerService;
import com.hdfclife.path2prospermicrosite.core.services.HttpMethodDetailsService;
import com.hdfclife.path2prospermicrosite.core.services.ResourceHelper;
import com.hdfclife.path2prospermicrosite.core.services.ScheduledCallBackService;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(
   service = {ScheduledCallBackService.class},
   immediate = true
)
public class ScheduledCallBackServiceImpl implements ScheduledCallBackService {
   @Reference
   ResourceHelper resourceHelper;
   @Reference
   HttpMethodDetailsService httpMethodDetailsService;
   @Reference
   HdfcLifeLoggerService hdfcLifeLoggerService;
   Logger logger = LoggerFactory.getLogger(this.getClass());

   public JsonObject getResponseAPIData(String phoneNo, String firstName, String insuranceCategory, String grecaptchaResponse) {
      JsonObject responseJsonObject = new JsonObject();

      try {
         JsonObject requestObject = new JsonObject();
         requestObject.addProperty("phone", phoneNo);
         requestObject.addProperty("first_name", firstName);
         requestObject.addProperty("source", "call-me-now");
         requestObject.addProperty("ndnc_flag", "true");
         requestObject.addProperty("recaptcha_version", 3);
         requestObject.addProperty("insurance_category", insuranceCategory);
         requestObject.addProperty("g-recaptcha-response", grecaptchaResponse);
         this.logger.debug("Scheduled Me call Back API Request - " + requestObject.toString());
         HttpAPIResponseModel apiResponse = this.httpMethodDetailsService.postHTTPMethodCallWithContentTypeJSON("https://api.hdfclife.com/forms/call-me-now/create/", requestObject.toString());
         this.logger.debug("Scheduled Me call Back API Response Status code - " + apiResponse.getStatusCode());
         JsonObject apiResponseJsonObject = (new JsonParser()).parse(apiResponse.getResponse()).getAsJsonObject();
         if (apiResponseJsonObject != null) {
            return apiResponseJsonObject;
         }
      } catch (RuntimeException var9) {
         this.logger.error("Exception: " + var9.toString());
         this.hdfcLifeLoggerService.loggerException(var9);
      }

      return responseJsonObject;
   }
}
