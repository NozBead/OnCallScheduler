package fr.funetdelire.oncallscheduler.config;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = "fr.funetdelire.oncallscheduler")
@Configuration 
public class OnCallSchedulerConfig implements WebMvcConfigurer{
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
	    registry.addViewController("/")
	    .setViewName("forward:scheduler.html");
	}
}
