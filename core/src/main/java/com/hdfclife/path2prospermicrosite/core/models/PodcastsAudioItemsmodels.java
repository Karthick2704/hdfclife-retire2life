package com.hdfclife.path2prospermicrosite.core.models;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
 
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PodcastsAudioItemsmodels {
 
    @ValueMapValue
    private String episodeImage;
 
    @ValueMapValue
    private String title;
 
    @ValueMapValue
    private String podcastDescription;
 
    @ValueMapValue
    private String buttonText;
 
    @ValueMapValue
    private String timeDuration;
 
    @ValueMapValue
    private String audio;
 
    @ValueMapValue
    private String bgColor;
 
     @ValueMapValue
    private String margin;
 
    @ValueMapValue
    private String height;
 
    @ValueMapValue
    private String width;
 
 
    public String getEpisodeImage() {
        return episodeImage;
    }

    public void setEpisodeImage(String episodeImage) {
        this.episodeImage = episodeImage;
    }
  
    public String getTitle() {
        return title;
    }
 
    public void setTitle(String title) {
        this.title = title;
    }
 
   public String getPodcastDescription() {
        return podcastDescription;
    }
 
    public void setPodcastDescription(String podcastDescription) {
        this.podcastDescription = podcastDescription;
    }
   
   public String getButtonText() {
        return buttonText;
    }
 
    public void setButtonText(String buttonText) {
        this.buttonText = buttonText;
    }
 
   public String getTimeDuration() {
        return timeDuration;
    }
 
    public void setTimeDuration(String timeDuration) {
        this.timeDuration = timeDuration;
    }
 
    public String getAudio() {
        return audio;
    }
 
    public void setAudio(String audio) {
        this.audio = audio;
    }
 
      public String getBgColor() {
        return bgColor;
    }
 
    public void setBgColor(String bgColor) {
        this.bgColor = bgColor;
    }
 
     public String getMargin() {
        return margin;
    }
 
    public void setMargin(String margin) {
        this.margin = margin;
    }
 
     public String getHeight() {
        return height;
    }
 
    public void setHeight(String height) {
        this.height = height;
    }
   
    public String getWidth() {
        return width;
    }
 
    public void setWidth(String width) {
        this.width = width;
    }
}
