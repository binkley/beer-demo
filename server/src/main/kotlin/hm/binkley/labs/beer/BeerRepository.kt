package hm.binkley.labs.beer

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource
interface BeerRepository : JpaRepository<Beer, Long>
