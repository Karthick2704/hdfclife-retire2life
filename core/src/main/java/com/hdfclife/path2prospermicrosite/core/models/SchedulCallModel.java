/* Decompiler 36ms, total 383ms, lines 39 */
package com.hdfclife.path2prospermicrosite.core.models;

import com.hdfclife.path2prospermicrosite.core.services.SchedulCallService;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

@Model(
   adaptables = {SlingHttpServletRequest.class},
   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class SchedulCallModel {
    
    private static final Logger LOG = LoggerFactory.getLogger(SchedulCallModel.class);
    
   @OSGiService
   SchedulCallService schedulCallService;
   List<SchedulCallPojoModel> schedualListDetails = new ArrayList();

   public List<SchedulCallPojoModel> getProductListingDetails() {
      return this.schedualListDetails;
   }

   @PostConstruct
   public void activate() {
      try {
         this.schedualListDetails = this.schedulCallService.getSchedualData();
      } catch (RuntimeException var2) {
        LOG.error("Runtime Exception {}", var2);
      }

   }
}
