package com.hdfclife.path2prospermicrosite.core.models;

import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;

import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.servlet.Servlet;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

@Component(service = Servlet.class, immediate = true, property = {
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES
                + "=hdfclifepath2prospermicrosite/components/structure/page",
        ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST,
        ServletResolverConstants.SLING_SERVLET_SELECTORS + "=searchresults",
        ServletResolverConstants.SLING_SERVLET_EXTENSIONS + "=json"
})
public class SearchFunction extends SlingAllMethodsServlet {

    private static final Logger logger = LoggerFactory.getLogger(SearchFunction.class);

    @Reference
    private QueryBuilder queryBuilder;

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {

        Logger logger = LoggerFactory.getLogger(SearchFunction.class);

        response.setContentType("application/json");
        String searchText = request.getParameter("searchText");
        String projectPath = request.getParameter("projectPath");

        // logger.info("Project Path: {}", projectPath);

        Map<String, String> predicate = new HashMap<>();
        predicate.put("type", "cq:Page");
        predicate.put("path", projectPath); // Use your project path here
        predicate.put("fulltext", searchText); // Search keyword
        predicate.put("property", "jcr:content/hideInNav"); // Property to filter
        predicate.put("property.operation", "not"); // Exclude pages where hideInNav=true
        predicate.put("property.value", "true"); 
        predicate.put("p.limit", "-1"); // Show all results
        

        try {
            Query query = queryBuilder.createQuery(PredicateGroup.create(predicate),
                    request.getResourceResolver().adaptTo(Session.class));
            SearchResult result = query.getResult();
            List<Hit> resourceList = result.getHits();
            JsonArrayBuilder object = Json.createArrayBuilder();

            for (Hit hit : resourceList) {
                try {
                    JsonObjectBuilder job = Json.createObjectBuilder();
                    Page page = hit.getResource().adaptTo(Page.class);
                    job.add("title", page.getTitle());
                    job.add("path", page.getPath());
                    if (page.getDescription() != null) {
                        job.add("Description", page.getDescription());
                    }
                    object.add(job);
                } catch (RepositoryException e) {
                    logger.error("Error processing search results: ", e);
                }
            }
            response.getWriter().write(object.build().toString());

        } catch (Exception e) {
            logger.error("Error executing query: ", e);
            response.getWriter().write(Json.createObjectBuilder()
                    .add("error", "Unable to process the search query.").build().toString());
        }
    }
}
