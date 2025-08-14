package com.hdfclife.path2prospermicrosite.core.models;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
 
import javax.inject.Inject;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AccordionBulletPointModel {
 
    @Inject
    private String number;
 
    @Inject
    private String question;
 
    @Inject
    private String answer;
 
    @Inject
    private String arrowIcon;
 
    public String getNumber() {
        return number;
    }
 
    public String getQuestion() {
        return question;
    }
 
    public String getAnswer() {
        return answer;
    }
 
    public String getArrowIcon() {
        return arrowIcon;
    }
 
}
 
 