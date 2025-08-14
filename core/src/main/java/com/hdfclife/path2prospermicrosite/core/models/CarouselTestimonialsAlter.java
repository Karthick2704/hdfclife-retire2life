package com.hdfclife.path2prospermicrosite.core.models;

 
import java.util.List;
import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CarouselTestimonialsAlter {
 
    // Inject the child resource representing the list of testimonials
    @ChildResource(name = "sectionOneBrandDetails")
    private List<CarouselTestimonialsMain> sectionOneBrandDetails;
 
    public List<CarouselTestimonialsMain> getSectionOneBrandDetails() {
        return sectionOneBrandDetails;
    }
}

