 package com.hdfclife.path2prospermicrosite.core.models;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
 
@Model(
   adaptables = {Resource.class},
   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class HeaderItem {
   @ValueMapValue
   private String targetPath;
   @ValueMapValue
   private String title;
 
   public HeaderItem() {
   }
 
   public String getTargetPath() {
      return this.targetPath;
   }
 
   public void setTargetPath(String targetPath) {
      this.targetPath = targetPath;
   }
 
   public String getTitle() {
      return this.title;
   }
 
   public void setTitle(String title) {
      this.title = title;
   }
}
 
 
