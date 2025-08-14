package com.hdfclife.path2prospermicrosite.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TagItemsModel {
 
    @ValueMapValue
    private String tags;
 
    @ValueMapValue
    private String tagsLinks;
 
    public String getTags() {
        return tags;
    }
 
    public void setTags(String tags) {
        this.tags = tags;
    }
 
    public String getTagsLinks() {
        return tagsLinks;
    }
 
    public void setTagsLinks(String tagsLinks) {
        this.tagsLinks = tagsLinks;
    }
}
 
 