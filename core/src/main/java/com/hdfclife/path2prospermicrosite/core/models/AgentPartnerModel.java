package com.hdfclife.path2prospermicrosite.core.models;
 
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue; 
import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
 
 
@Model(adaptables = Resource.class, adapters = AgentPartnerModel.class)
public class AgentPartnerModel {
 
    public static class SectionOneBrandDetail {
        private String blogLink;
        private String blogType;
        private String blogImage;
        private String blogIcon;
        private String blogDate;
        private String imagePath;
        private String shareIcon;
        private String blogTitle;
        private String altImage;
        private String altIcon;
        private String altTime;
        private String altShare;
       
 
 
        // Getters and Setters for SectionOneBrandDetail class
        public String getBlogLink() {
            return blogLink;
        }
 
 
        public void setBlogLink(String blogLink) {
            this.blogLink = blogLink;
        }
        public String getBlogType() {
            return blogType;
        }
 
 
        public void setBlogType(String blogType) {
            this.blogType = blogType;
        }
 
 
        public String getBlogImage() {
            return blogImage;
        }
 
 
        public void setBlogImage(String blogImage) {
            this.blogImage = blogImage;
        }
 
 
        public String getBlogIcon() {
            return blogIcon;
        }
 
 
        public void setBlogIcon(String blogIcon) {
            this.blogIcon = blogIcon;
        }
 
 
        public String getBlogDate() {
            return blogDate;
        }
 
 
        public void setBlogDate(String blogDate) {
            this.blogDate = blogDate;
        }
 
 
        public String getImagePath() {
            return imagePath;
        }
 
 
        public void setImagePath(String imagePath) {
            this.imagePath = imagePath;
        }
 
 
        public String getShareIcon() {
            return shareIcon;
        }
 
 
        public void setShareIcon(String shareIcon) {
            this.shareIcon = shareIcon;
        }
 
 
        public String getBlogTitle() {
            return blogTitle;
        }
 
 
        public void setBlogTitle(String blogTitle) {
            this.blogTitle = blogTitle;
        }
        public String getAltImage() {
            return altImage;
        }
 
 
        public void setAltImage(String altImage) {
            this.altImage = altImage;
        }
        public String getAltIcon() {
            return altIcon;
        }
 
 
        public void setAltIcon(String altIcon) {
            this.altIcon = altIcon;
        }
        public String getAltTime() {
            return altTime;
        }
 
 
        public void setAltTime(String altTime) {
            this.altTime = altTime;
        }
        public String getAltShare() {
            return altShare;
        }
 
 
        public void setAltShare(String altShare) {
            this.altShare = altShare;
        }
       
    }
 
 
    @ChildResource(name = "sectionOneBrandDetails")
    private Resource sectionOneBrandDetailsResource;
 
 
    private List<SectionOneBrandDetail> sectionOneBrandDetails;
 
 
    @ValueMapValue
    @Default(values = "Default Header")
    private String headerTitle;
 
 
    @PostConstruct
    protected void init() {
        sectionOneBrandDetails = new ArrayList<>();
        if (sectionOneBrandDetailsResource != null) {
            for (Resource resource : sectionOneBrandDetailsResource.getChildren()) {
                SectionOneBrandDetail detail = new SectionOneBrandDetail();
                ValueMap valueMap = resource.getValueMap();
 
 
                detail.setBlogLink(valueMap.get("blogLink", String.class));
                detail.setBlogType(valueMap.get("blogType", String.class));
                detail.setBlogImage(valueMap.get("blogImage", String.class));
                detail.setBlogIcon(valueMap.get("blogIcon", String.class));
                detail.setBlogDate(valueMap.get("blogDate", String.class));
                detail.setImagePath(valueMap.get("imagePath", String.class));
                detail.setShareIcon(valueMap.get("shareIcon", String.class));
                detail.setBlogTitle(valueMap.get("blogTitle", String.class));
                detail.setAltImage(valueMap.get("altImage", String.class));
                detail.setAltIcon(valueMap.get("altIcon", String.class));                
                detail.setAltTime(valueMap.get("altTime", String.class));
                detail.setAltShare(valueMap.get("altShare", String.class));
 
 
                sectionOneBrandDetails.add(detail);
            }
        }
    }
 
 
    // Getter for headerTitle
    public String getHeaderTitle() {
        return headerTitle;
    }
 
 
    // Getter for sectionOneBrandDetails
    public List<SectionOneBrandDetail> getSectionOneBrandDetails() {
        return sectionOneBrandDetails;
    }
}