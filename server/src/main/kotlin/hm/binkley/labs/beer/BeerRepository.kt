package hm.binkley.labs.beer

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin
@RepositoryRestResource
interface BeerRepository : JpaRepository<Beer, Long> {
    @RestResource(path = "good-beers", rel = "good-beers")
    fun findByQualityGreaterThan(quality: Int): List<Beer>
}
