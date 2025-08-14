package com.hdfclife.path2prospermicrosite.core.models;
 
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
 
import javax.annotation.PostConstruct;
import javax.inject.Inject;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NavigationModel {
 
    private static final Logger LOGGER = LoggerFactory.getLogger(NavigationModel.class);
 
    @SlingObject
    private Resource resource;
 
    private PageManager pageManager;
 
    @Inject
    private String path;
 
    @Inject
    private String description;
 
    @Inject
    private String url;
 
    private Page currentPage;
 
    private List<NavigationItem> items;
 
    @PostConstruct
    protected void init() {
        LOGGER.debug("Initializing NavigationModel...");
        pageManager = resource.getResourceResolver().adaptTo(PageManager.class);
        if (pageManager != null && path != null && !path.isEmpty()) {
            LOGGER.debug("pageManager, path are not null or empty, proceeding with initialization...");
            currentPage = pageManager.getPage(path);
            if (currentPage != null) {
                LOGGER.debug("currentPage is not null, building navigation items...");
                items = buildNavigation(currentPage);
            } else {
                LOGGER.error("currentPage is null, unable to build navigation items.");
            }
        } else {
            LOGGER.error("Missing required parameters for NavigationModel initialization: pageManager={}, path={}", pageManager, path);
        }
    }
 
    public List<NavigationItem> getItems() {
        return items;
    }
 
    public String getDescription() {
        return description;
    }
 
    public String getUrl() {
        return url;
    }
 
    private List<NavigationItem> buildNavigation(Page currentPage) {
        LOGGER.debug("Building navigation items...");
        List<NavigationItem> navigationItems = new ArrayList<>();
        Iterator<Page> siblings = currentPage.listChildren();
        while (siblings.hasNext()) {
            Page sibling = siblings.next();
            if (isPageVisible(sibling)) {
                navigationItems.add(new NavigationItem(sibling, currentPage));
            }
        }
        return navigationItems;
    }
 
    private static boolean isPageVisible(Page page) {
        return !page.getProperties().get("hideInNav", Boolean.FALSE);
    }
 
    public static class NavigationItem {
        private String title;
        private String url;
        private boolean isActive;
        private String description;
 
        public NavigationItem(Page page, Page currentPage) {
            if (page != null && currentPage != null) {
                this.title = page.getTitle();
                this.url = page.getPath() + ".html";
                this.isActive = page.getPath().equals(currentPage.getPath());
                this.description = page.getDescription();
            } else {
                LOGGER.error("Missing required parameters for NavigationItem initialization: page={}, currentPage={}", page, currentPage);
            }
        }
 
        public String getTitle() {
            return title;
        }
 
        public String getUrl() {
            return url;
        }
 
        public boolean isActive() {
            return isActive;
        }
 
        public String getDescription() {
            return description;
        }
    }
}
 
 