package com.hdfclife.path2prospermicrosite.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;

@Model(
   adaptables = {SlingHttpServletRequest.class}
)
public class UTMSourceHelper extends WCMUsePojo {
   @Inject
   SlingHttpServletRequest request;
   private boolean hideHeader = false;
   private List<String> selectors = new ArrayList();
   private String qid = "";

   @PostConstruct
   public void activate() throws Exception {
      if (this.request != null) {
         this.selectors = Arrays.asList(this.request.getRequestPathInfo().getSelectors());
         this.hideHeader = this.selectors.contains("is-mobile");

         for(int i = 0; i < this.selectors.size(); ++i) {
            if (!((String)this.selectors.get(i)).equals("is-mobile")) {
               this.qid = (String)this.selectors.get(i);
            }
         }
      }

   }

   public boolean getHideHeader() {
      return this.hideHeader;
   }

   public String getQuoteId() {
      return this.qid;
   }
}
