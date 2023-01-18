package com.home.cgroupintbe.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@Configuration
public class CustomSessionListener implements HttpSessionListener {

    @Value("${app.config.server.maxSessionInterval}")
    private int maxIntervalSession;

    @Override
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {
        httpSessionEvent.getSession().setMaxInactiveInterval(maxIntervalSession);
    }
}
