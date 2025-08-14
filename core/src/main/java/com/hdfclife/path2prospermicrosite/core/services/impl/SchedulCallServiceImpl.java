/* Decompiler 202ms, total 841ms, lines 166 */
package com.hdfclife.path2prospermicrosite.core.services.impl;

import com.hdfclife.path2prospermicrosite.core.models.SchedulCallPojoModel;
import com.hdfclife.path2prospermicrosite.core.services.HdfcLifeLoggerService;
import com.hdfclife.path2prospermicrosite.core.services.ResourceHelper;
import com.hdfclife.path2prospermicrosite.core.services.SchedulCallService;
import java.util.ArrayList;
import java.util.List;
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(
   service = {SchedulCallService.class},
   immediate = true
)
public class SchedulCallServiceImpl implements SchedulCallService {
   @Reference
   ResourceHelper resourceHelper;
   @Reference
   HdfcLifeLoggerService hdfcLifeLoggerService;

   public List<SchedulCallPojoModel> getSchedualData() {
      List<SchedulCallPojoModel> schedulCallList = new ArrayList<>();
      SchedulCallPojoModel schedulCallPojoModel = new SchedulCallPojoModel();
      ResourceResolver resourceResolver = null;

      try {
         resourceResolver = this.resourceHelper.getResourceResolver();
         Resource rootResource = resourceResolver.getResource("/content/dam/hdfclifepath2prospermicrosite/home/content-fragment/schedule-a-call/jcr:content/data/master");
         if (rootResource != null) {
            Node node = (Node)rootResource.adaptTo(Node.class);
            if (node.hasProperty("checkboxValidation")) {
               schedulCallPojoModel.setCheckboxValidation(StringEscapeUtils.unescapeHtml(node.getProperty("checkboxValidation").getString()));
            } else {
               schedulCallPojoModel.setCheckboxValidation("");
            }

            if (node.hasProperty("consentText")) {
               schedulCallPojoModel.setConsentText(StringEscapeUtils.unescapeHtml(node.getProperty("consentText").getString()));
            } else {
               schedulCallPojoModel.setConsentText("");
            }

            if (node.hasProperty("differentSession")) {
               schedulCallPojoModel.setDifferentSession(StringEscapeUtils.unescapeHtml(node.getProperty("differentSession").getString()));
            } else {
               schedulCallPojoModel.setDifferentSession("");
            }

            if (node.hasProperty("exhaustedErrorMessage")) {
               schedulCallPojoModel.setExhaustedErrorMessage(StringEscapeUtils.unescapeHtml(node.getProperty("exhaustedErrorMessage").getString()));
            } else {
               schedulCallPojoModel.setExhaustedErrorMessage("");
            }

            if (node.hasProperty("reschedulingCall")) {
               schedulCallPojoModel.setReschedulingCall(StringEscapeUtils.unescapeHtml(node.getProperty("reschedulingCall").getString()));
            } else {
               schedulCallPojoModel.setReschedulingCall("");
            }

            if (node.hasProperty("schedulingCall")) {
               schedulCallPojoModel.setSchedulingCall(StringEscapeUtils.unescapeHtml(node.getProperty("schedulingCall").getString()));
            } else {
               schedulCallPojoModel.setSchedulingCall("");
            }

            if (node.hasProperty("subtitle")) {
               schedulCallPojoModel.setSubtitle(StringEscapeUtils.unescapeHtml(node.getProperty("subtitle").getString()));
            } else {
               schedulCallPojoModel.setSubtitle("");
            }

            if (node.hasProperty("textForContact")) {
               schedulCallPojoModel.setTextForContact(StringEscapeUtils.unescapeHtml(node.getProperty("textForContact").getString()));
            } else {
               schedulCallPojoModel.setTextForContact("");
            }

            if (node.hasProperty("textForCta")) {
               schedulCallPojoModel.setTextForCta(StringEscapeUtils.unescapeHtml(node.getProperty("textForCta").getString()));
            } else {
               schedulCallPojoModel.setTextForCta("");
            }

            if (node.hasProperty("textForDate")) {
               schedulCallPojoModel.setTextForDate(StringEscapeUtils.unescapeHtml(node.getProperty("textForDate").getString()));
            } else {
               schedulCallPojoModel.setTextForDate("");
            }

            if (node.hasProperty("textForDisclaimer")) {
               schedulCallPojoModel.setTextForDisclaimer(StringEscapeUtils.unescapeHtml(node.getProperty("textForDisclaimer").getString()));
            } else {
               schedulCallPojoModel.setTextForDisclaimer("");
            }

            if (node.hasProperty("textForInsurance")) {
               schedulCallPojoModel.setTextForInsurance(StringEscapeUtils.unescapeHtml(node.getProperty("textForInsurance").getString()));
            } else {
               schedulCallPojoModel.setTextForInsurance("");
            }

            if (node.hasProperty("textForName")) {
               schedulCallPojoModel.setTextForName(StringEscapeUtils.unescapeHtml(node.getProperty("textForName").getString()));
            } else {
               schedulCallPojoModel.setTextForName("");
            }

            if (node.hasProperty("textForService")) {
               schedulCallPojoModel.setTextForService(StringEscapeUtils.unescapeHtml(node.getProperty("textForService").getString()));
            } else {
               schedulCallPojoModel.setTextForService("");
            }

            if (node.hasProperty("textForTime")) {
               schedulCallPojoModel.setTextForTime(StringEscapeUtils.unescapeHtml(node.getProperty("textForTime").getString()));
            } else {
               schedulCallPojoModel.setTextForTime("");
            }

            if (node.hasProperty("title")) {
               schedulCallPojoModel.setTitle(StringEscapeUtils.unescapeHtml(node.getProperty("title").getString()));
            } else {
               schedulCallPojoModel.setTitle("");
            }

            if (node.hasProperty("subtext")) {
               schedulCallPojoModel.setSubtext(StringEscapeUtils.unescapeHtml(node.getProperty("subtext").getString()));
            } else {
               schedulCallPojoModel.setSubtext("");
            }

            if (node.hasProperty("instantCall")) {
               schedulCallPojoModel.setInstantCall(StringEscapeUtils.unescapeHtml(node.getProperty("instantCall").getString()));
            } else {
               schedulCallPojoModel.setInstantCall("");
            }

            if (node.hasProperty("nextctaText")) {
               schedulCallPojoModel.setNextctaText(StringEscapeUtils.unescapeHtml(node.getProperty("nextctaText").getString()));
            } else {
               schedulCallPojoModel.setNextctaText("");
            }

            schedulCallList.add(schedulCallPojoModel);
         }
      } catch (LoginException | RepositoryException var9) {
         this.hdfcLifeLoggerService.loggerException(var9);
      } finally {
         if (resourceResolver != null && resourceResolver.isLive()) {
            resourceResolver.close();
         }

      }

      return schedulCallList;
   }
}
