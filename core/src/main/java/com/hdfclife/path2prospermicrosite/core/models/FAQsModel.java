package com.hdfclife.path2prospermicrosite.core.models;
 
import javax.inject.Inject;
import java.util.List;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FAQsModel {
 
    @Inject
    private List<FAQsDropdownitemsModel> sectionOneBrandDetails;
 
 
    public List<FAQsDropdownitemsModel> getSectionOneBrandDetails() {
        return sectionOneBrandDetails;
    }
 
    public void setSectionOneBrandDetails(List<FAQsDropdownitemsModel> sectionOneBrandDetails) {
        this.sectionOneBrandDetails = sectionOneBrandDetails;
    }
 
   
}