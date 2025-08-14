package com.hdfclife.path2prospermicrosite.core.models;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CarouselTestimonialsMain {
 
    @ValueMapValue
    private String mainContent;
 
    @ValueMapValue
    private String imageFileReference;
 
    @ValueMapValue
    private String altText;
 
    @ValueMapValue
    private String subContentOne;

    @ValueMapValue
    private String subContentTwo;

    @ValueMapValue
    private String subContentThree;
 
    @ValueMapValue
    private String quoteImageFileReference;
 
    @ValueMapValue
    private String quoteAltText;
 
    public String getMainContent() {
        return mainContent;
    }
 
    public String getAltText() {
        return altText;
    }
 
    public String getImageFileReference() {
        return imageFileReference;
    }
 
    public String getSubContentOne() {
        return subContentOne;
    }

    public String getSubContentTwo() {
        return subContentTwo;
    }
    public String getSubContentThree() {
        return subContentThree;
    }
 
    public String getQuoteImageFileReference() {
        return quoteImageFileReference;
    }
 
    public String getQuoteAltText() {
        return quoteAltText;
    }
}
 
 