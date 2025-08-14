 package com.hdfclife.path2prospermicrosite.core.models;
 
import java.util.List;
import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
 
@Model(
   adaptables = {Resource.class},
   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class HeaderModel {
   @Inject
   private List<HeaderItem> sectionOneBrandDetails;
 
   public HeaderModel() {
   }
 
   public List<HeaderItem> getSectionOneBrandDetails() {
      return this.sectionOneBrandDetails;
   }
 
   public void setSectionOneBrandDetails(List<HeaderItem> sectionOneBrandDetails) {
      this.sectionOneBrandDetails = sectionOneBrandDetails;
   }
}
 
 
