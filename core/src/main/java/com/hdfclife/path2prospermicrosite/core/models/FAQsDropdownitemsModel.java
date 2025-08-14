package com.hdfclife.path2prospermicrosite.core.models;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FAQsDropdownitemsModel {
 
    @ValueMapValue
    private String question;
 
     @ValueMapValue
    private String answer;
 
     @ValueMapValue
    private String iconFileReference;
 
   
 
    public String getQuestion() {
        return question;
    }
 
    public void setQuestion(String question) {
        this.question = question;
    }
 
     public String getAnswer() {
        return answer;
    }
 
    public void setAnswer(String answer) {
        this.answer = answer;
    }
 
     public String getIconFileReference() {
        return iconFileReference;
    }
 
    public void setIconFileReference(String iconFileReference) {
        this.iconFileReference = iconFileReference;
    }
 
   
}