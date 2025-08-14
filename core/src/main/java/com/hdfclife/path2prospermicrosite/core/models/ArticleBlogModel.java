package com.hdfclife.path2prospermicrosite.core.models;

import javax.inject.Inject;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ArticleBlogModel {

    @Inject
    private List<ArticleBlogItem> sectionOneBrandDetails;

    public List<ArticleBlogItem> getSectionOneBrandDetails() {
        return sectionOneBrandDetails;
    }

    public void setSectionOneBrandDetails(List<ArticleBlogItem> sectionOneBrandDetails) {
        this.sectionOneBrandDetails = sectionOneBrandDetails;
    }

}