package com.hdfclife.path2prospermicrosite.core.services.impl;

import com.hdfclife.path2prospermicrosite.core.services.HdfcLifeLoggerService;
import com.hdfclife.path2prospermicrosite.core.services.ResourceHelper;
import java.util.HashMap;
import java.util.Map;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(
   service = {ResourceHelper.class},
   immediate = true
)
public class ResourceHelperImpl implements ResourceHelper {
   private Logger logger = LoggerFactory.getLogger(this.getClass());
   @Reference
   HdfcLifeLoggerService hdfcLifeLoggerService;
   @Reference
   ResourceResolverFactory resResolverFactory;

   public ResourceResolver getResourceResolver() throws LoginException {
      try {
         Map<String, Object> map = new HashMap<>();
         map.put(ResourceResolverFactory.SUBSERVICE, "hdfcmicrositeuser");
         ResourceResolver resourceResolver = this.resResolverFactory.getServiceResourceResolver(map);
         StringBuilder stringBuilderInfo = new StringBuilder(100);
         stringBuilderInfo.append("resourceResolver");
         stringBuilderInfo.append(resourceResolver);
         String logInnfo = stringBuilderInfo.toString();
         this.logger.debug(logInnfo);
         return resourceResolver;
      } catch (RuntimeException var5) {
         this.hdfcLifeLoggerService.loggerException(var5);
         return null;
      }
   }
}
