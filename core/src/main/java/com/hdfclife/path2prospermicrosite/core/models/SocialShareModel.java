package com.hdfclife.path2prospermicrosite.core.models;
 
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SocialShareModel {
 
    @ValueMapValue
    private String socialShareImage;
 
    public String getSocialShareImage() {
        return socialShareImage;
    }
 
    public void setSocialShareImage(String socialShareImage) {
        this.socialShareImage = socialShareImage;
    }
 
    @ValueMapValue
    private String socialShareAltText;
 
    public String getSocialShareAltText() {
        return socialShareAltText;
    }
 
    public void setSocialShareAltText(String socialShareAltText) {
        this.socialShareAltText = socialShareAltText;
    }
 
 
    @ValueMapValue
    private String socialShareName;
 
    public String getSocialShareName() {
        return socialShareName;
    }
 
    public void setSocialShareName(String socialShareName) {
        this.socialShareName = socialShareName;
    }
 
   
}
