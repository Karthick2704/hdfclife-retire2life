package com.hdfclife.path2prospermicrosite.core.models;
 
import javax.inject.Inject;
import java.util.List;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SocialShareItem {
 
    @Inject
    private List<SocialShareModel> sectionOneBrandDetails;
 
 
 
    public List<SocialShareModel> getSectionOneBrandDetails() {
        return sectionOneBrandDetails;
    }  
 
    public void setSectionOneBrandDetails(List<SocialShareModel> sectionOneBrandDetails) {
        this.sectionOneBrandDetails = sectionOneBrandDetails;
    }
 
}