package com.ankit.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.ankit.ecommerce.entity.Product;
import com.ankit.ecommerce.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		this.entityManager=theEntityManager;
	}
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		HttpMethod[] theUnsupportedActions= {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
		
		//Disable http methods for Product: PUT , POST AND DELETE
		config.getExposureConfiguration()
		       .forDomainType(Product.class)
		       .withItemExposure((metdata,httpMethods)-> httpMethods.disable(theUnsupportedActions))
		       .withCollectionExposure((metdata,httpMethods)-> httpMethods.disable(theUnsupportedActions));
		
		//Disable http methods for ProductCategory: PUT , POST AND DELETE
		config.getExposureConfiguration()
		       .forDomainType(ProductCategory.class)
		       .withItemExposure((metdata,httpMethods)-> httpMethods.disable(theUnsupportedActions))
		       .withCollectionExposure((metdata,httpMethods)-> httpMethods.disable(theUnsupportedActions));

		//call an internal helper method
		exposeIds(config);
		
	}
	
	private void exposeIds(RepositoryRestConfiguration config) {
		//expose entity id
		//
		//-get a list of all entity classes from the entity manager
		Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();
		
		// create  an array of the entity types
		List<Class> entiClasses=new ArrayList<>();
		
		//get the entity type for the entities
		for(EntityType tempEntityType:entities) {
			entiClasses.add(tempEntityType.getJavaType());
		}
		
		// expose the entity ids for the array of entity/domain types
		Class[] domainTypes=entiClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
	}
	
	

}
