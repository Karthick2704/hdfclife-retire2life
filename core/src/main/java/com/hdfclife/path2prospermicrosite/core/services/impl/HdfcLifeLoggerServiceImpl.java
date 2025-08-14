/* Decompiler 16ms, total 621ms, lines 25 */
package com.hdfclife.path2prospermicrosite.core.services.impl;

import com.hdfclife.path2prospermicrosite.core.services.HdfcLifeLoggerService;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(
   service = {HdfcLifeLoggerService.class},
   immediate = true
)
public class HdfcLifeLoggerServiceImpl implements HdfcLifeLoggerService {
   private Logger log = LoggerFactory.getLogger(this.getClass());

   public void loggerException(Exception e) {
      StringBuilder stringBuilder = new StringBuilder(100);
      stringBuilder.append("Exception ->{} ");
      stringBuilder.append(e.getClass().getSimpleName());
      stringBuilder.append(": ");
      stringBuilder.append(e);
      String logError = stringBuilder.toString();
      this.log.error(logError);
   }
}
