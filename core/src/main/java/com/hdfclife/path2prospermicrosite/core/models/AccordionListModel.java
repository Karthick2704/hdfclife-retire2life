package com.hdfclife.path2prospermicrosite.core.models;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
 
import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AccordionListModel {
 
 
    @Inject
    @Named("./accordions")
    public List<AccordionModel> accordionList;
 
    public List<AccordionModel> getAccordionList() {
        return accordionList;
    }
 
 
}
 
 