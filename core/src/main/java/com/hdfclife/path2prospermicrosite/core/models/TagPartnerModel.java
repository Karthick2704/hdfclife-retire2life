package com.hdfclife.path2prospermicrosite.core.models;

import javax.inject.Inject;
import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TagPartnerModel {
 
    @Inject
    private List<TagItemsModel> sectionOneBrandDetails;  // Use TagItemsModel here
 
    public List<TagItemsModel> getSectionOneBrandDetails() {
        return sectionOneBrandDetails;
    }
 
    public void setSectionOneBrandDetails(List<TagItemsModel> sectionOneBrandDetails) {
        this.sectionOneBrandDetails = sectionOneBrandDetails;
    }
}
 
 
 