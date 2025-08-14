package com.hdfclife.path2prospermicrosite.core.models;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
 
import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AccordionModel {
 
    // Injected properties for accordion details
    @Inject
    private String title;
 
    @Inject
    private String viewAll;
 
    @Inject
    private String iconFileReferenceViewAll;
 
    @Inject
    private String viewLess;
 
    @Inject
    private String iconFileReferenceViewLess;
 
    @Inject
    private String buttonId;
 
    @Inject
    private String viewAllIconAltText;
 
    @Inject
    private String viewLessIconAltText;
 
    // Getter for button ID
    public String getButtonId() {
        return buttonId;
    }
 
    // Getter for title
    public String getTitle() {
        return title;
    }
 
    // Getter for "View All" text
    public String getViewAll() {
        return viewAll;
    }
 
    // Getter for "View All" icon file reference
    public String getIconFileReferenceViewAll() {
        return iconFileReferenceViewAll;
    }
 
    // Getter for "View Less" text
    public String getViewLess() {
        return viewLess;
    }
 
    // Getter for "View Less" icon file reference
    public String getIconFileReferenceViewLess() {
        return iconFileReferenceViewLess;
    }
 
     public String getViewAllIconAltText() {
        return viewAllIconAltText;
    }
 
     public String getViewLessIconAltText() {
        return viewLessIconAltText;
    }
 
    // Inject child nodes under "./list"
    @Inject
    @Named("./list")
    private List<AccordionBulletPointModel> bulletPointList;
 
    // Getter for bullet point list
    public List<AccordionBulletPointModel> getBulletPointList() {
        return bulletPointList;
    }
}
 
 