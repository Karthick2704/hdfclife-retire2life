package com.hdfclife.path2prospermicrosite.core.models;

import javax.inject.Inject;
import java.util.List;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CarouselMenuItem {
 
    @Inject
    private List<CarouselMenuModel> sectionOneBrandDetails;
 
 
 
    public List<CarouselMenuModel> getSectionOneBrandDetails() {
        return sectionOneBrandDetails;
    }  
 
    public void setSectionOneBrandDetails(List<CarouselMenuModel> sectionOneBrandDetails) {
        this.sectionOneBrandDetails = sectionOneBrandDetails;
    }
 
}