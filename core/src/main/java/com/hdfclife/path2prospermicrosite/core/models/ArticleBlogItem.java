package com.hdfclife.path2prospermicrosite.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ArticleBlogItem {

    @ValueMapValue
    private String blogLink;

    public String getBlogLink() {
        return blogLink;
    }

    public void setBlogLink(String blogLink) {
        this.blogLink = blogLink;
    }

    @ValueMapValue
    private String blogType;

    public String getBlogType() {
        return blogType;
    }

    public void setBlogType(String blogType) {
        this.blogType = blogType;
    }

    @ValueMapValue
    private String blogImage;

    public String getBlogImage() {
        return blogImage;
    }

    public void setBlogImage(String blogImage) {
        this.blogImage = blogImage;
    }

    @ValueMapValue
    private String blogIcon;

    public String getBlogIcon() {
        return blogIcon;
    }

    public void setBlogIcon(String blogIcon) {
        this.blogIcon = blogIcon;
    }

    @ValueMapValue
    private String blogDate;

    public String getBlogDate() {
        return blogDate;
    }

    public void setBlogDate(String blogDate) {
        this.blogDate = blogDate;
    }

    @ValueMapValue
    private String imagePath;

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @ValueMapValue
    private String shareIcon;

    public String getShareIcon() {
        return shareIcon;
    }

    public void setShareIcon(String shareIcon) {
        this.shareIcon = shareIcon;
    }

    @ValueMapValue
    private String blogTitle;

    public String getBlogTitle() {
        return blogTitle;
    }

    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle;
    }

    @ValueMapValue
    private String altImage;

    public String getAltImage() {
        return altImage;
    }

    public void setAltImage(String altImage) {
        this.altImage = altImage;
    }

    @ValueMapValue
    private String altIcon;

    public String getAltIcon() {
        return altIcon;
    }

    public void setAltIcon(String altIcon) {
        this.altIcon = altIcon;
    }

    @ValueMapValue
    private String altTime;

    public String getAltTime() {
        return altTime;
    }

    public void setAltTime(String altTime) {
        this.altTime = altTime;
    }

    @ValueMapValue
    private String altShare;

    public String getAltShare() {
        return altShare;
    }

    public void setAltShare(String altShare) {
        this.altShare = altShare;
    }

    @ValueMapValue
    private String mediaTwitter;

    public String getMediaTwitter() {
        return mediaTwitter;
    }

    public void setMediaTwitter(String mediaTwitter) {
        this.mediaTwitter = mediaTwitter;
    }

    @ValueMapValue
    private String mediaFacebook;

    public String getMediaFacebook() {
        return mediaFacebook;
    }

    public void setMediaFacebook(String mediaFacebook) {
        this.mediaFacebook = mediaFacebook;
    }

    @ValueMapValue
    private String mediaLinkedin;

    public String getMediaLinkedin() {
        return mediaLinkedin;
    }

    public void setMediaLinkedin(String mediaLinkedin) {
        this.mediaLinkedin = mediaLinkedin;
    }

    @ValueMapValue
    private String mediaWhatsapp;

    public String getMediaWhatsapp() {
        return mediaWhatsapp;
    }

    public void setMediaWhatsapp(String mediaWhatsapp) {
        this.mediaWhatsapp = mediaWhatsapp;
    }

    @ValueMapValue
    private String altTwitter;

    public String getAltTwitter() {
        return altTwitter;
    }

    public void setAltTwitter(String altTwitter) {
        this.altTwitter = altTwitter;
    }

    @ValueMapValue
    private String altFacebook;

    public String getAltFacebook() {
        return altFacebook;
    }

    public void setAltFacebook(String altFacebook) {
        this.altFacebook = altFacebook;
    }

    @ValueMapValue
    private String altLinkedin;

    public String getAltLinkedin() {
        return altLinkedin;
    }

    public void setAltLinkedin(String altLinkedin) {
        this.altLinkedin = altLinkedin;
    }

    @ValueMapValue
    private String altWhatsapp;

    public String getAltWhatsapp() {
        return altWhatsapp;
    }

    public void setAltWhatsapp(String altWhatsapp) {
        this.altWhatsapp = altWhatsapp;
    }
}