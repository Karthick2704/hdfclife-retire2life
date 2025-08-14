package com.hdfclife.path2prospermicrosite.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import java.text.SimpleDateFormat;
import java.util.*;

@Model(
    adaptables = {Resource.class, SlingHttpServletRequest.class},
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class HDFCPillarModel {

    private static final Logger LOG = LoggerFactory.getLogger(HDFCPillarModel.class);

    private Resource resource;

    @Inject
    private SlingHttpServletRequest request;

    @Inject
    private boolean fetchLatestOnly; 

    @Inject
    private String parentPath; // The path to the root page

    private List<Map<String, Object>> childPages;

    private String jsonChildPages;

    @PostConstruct
    protected void init() {
        childPages = new ArrayList<>();
        resource = request.getResource();
        ResourceResolver resourceResolver = resource.getResourceResolver();
        try {
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            if (pageManager != null && parentPath != null) {
                Page rootPage = pageManager.getPage(parentPath);
                if (rootPage != null) {
                    Iterator<Page> firstLevelPages = rootPage.listChildren();
                    while (firstLevelPages.hasNext()) {
                        Page firstChildPage = firstLevelPages.next();
                        if (fetchLatestOnly) {
                            // Fetch only the latest second-level child page
                            Map<String, Object> latestPage = getLatestSecondLevelPage(firstChildPage);
                            if (latestPage != null) {
                                childPages.add(latestPage);
                            }
                        } else {
                            // Fetch all second-level child pages
                            List<Map<String, Object>> allPages = getAllSecondLevelPages(firstChildPage);
                            childPages.addAll(allPages);
                        }
                    }

                    // Sort the child pages by published date
                    childPages.sort((page1, page2) -> {
                        Date date1 = (Date) page1.get("publishedDateRaw");
                        Date date2 = (Date) page2.get("publishedDateRaw");
                        return date2.compareTo(date1); // Descending order
                    });

                    // Remove raw date after sorting
                    for (Map<String, Object> page : childPages) {
                        page.remove("publishedDateRaw");
                    }
                }
            }
        } catch (Exception e) {
            LOG.error("Error while fetching child pages", e);
        }
    }

    private Map<String, Object> getLatestSecondLevelPage(Page firstChildPage) {
        Iterator<Page> secondLevelPages = firstChildPage.listChildren();
        Page latestPage = null;
        Calendar latestCalendar = null;

        while (secondLevelPages.hasNext()) {
            Page secondChildPage = secondLevelPages.next();
            Calendar publishedDate = secondChildPage.getProperties().get("publishedDate", Calendar.class);
            if (publishedDate != null) {
                if (latestPage == null || publishedDate.after(latestCalendar)) {
                    latestPage = secondChildPage;
                    latestCalendar = publishedDate;
                }
            }
        }

        return getPageDetails(latestPage, latestCalendar);
    }

    private List<Map<String, Object>> getAllSecondLevelPages(Page firstChildPage) {
        List<Map<String, Object>> pages = new ArrayList<>();
        Iterator<Page> secondLevelPages = firstChildPage.listChildren();

        while (secondLevelPages.hasNext()) {
            Page secondChildPage = secondLevelPages.next();
            Calendar publishedDate = secondChildPage.getProperties().get("publishedDate", Calendar.class);
            Map<String, Object> pageDetails = getPageDetails(secondChildPage, publishedDate);
            if (pageDetails != null) {
                pages.add(pageDetails);
            }
        }

        return pages;
    }

    private Map<String, Object> getPageDetails(Page page, Calendar publishedCalendar) {
        if (page != null && publishedCalendar != null) {
            Map<String, Object> pageProperties = new HashMap<>();
            // Format to "Dec 02"
            SimpleDateFormat dateFormatForDate = new SimpleDateFormat("MMM dd");
            // Extract the year separately
            SimpleDateFormat dateFormatForYear = new SimpleDateFormat("yyyy"); 
            Date publishedDate = publishedCalendar.getTime();

            pageProperties.put("title", page.getTitle());
            pageProperties.put("articletype", page.getProperties().get("articletype", String.class));
            pageProperties.put("backgroundImagePath", page.getProperties().get("backgroundImagePath", String.class));
            pageProperties.put("bannerAltText", page.getProperties().get("bannerAltText", String.class));
            pageProperties.put("mobileBackgroundImagePath", page.getProperties().get("mobileBackgroundImagePath", String.class));
            pageProperties.put("mobileImageAltText", page.getProperties().get("mobileImageAltText", String.class));
            pageProperties.put("bannerContent", page.getProperties().get("bannerContent", String.class));
            pageProperties.put("bannerIcon", page.getProperties().get("bannerIcon", String.class));
            pageProperties.put("bannerIconText", page.getProperties().get("bannerIconText", String.class));
            pageProperties.put("bannerSubContent", page.getProperties().get("bannerSubContent", String.class));
            pageProperties.put("publishedDate", dateFormatForDate.format(publishedDate));
            pageProperties.put("publishedYear", dateFormatForYear.format(publishedDate));
            pageProperties.put("publishedDateRaw", publishedDate);
            pageProperties.put("articleheading", page.getProperties().get("articleheading", String.class));
            pageProperties.put("articledesc", page.getProperties().get("articledesc", String.class));
            pageProperties.put("readtime", page.getProperties().get("readtime", String.class));
            pageProperties.put("redirectPath", page.getPath());

            return pageProperties;
        }
        return null;
    }

    public List<Map<String, Object>> getChildPages() {
        return childPages;
    }

    public String getJsonChildPages() {
        return jsonChildPages;
    }
}