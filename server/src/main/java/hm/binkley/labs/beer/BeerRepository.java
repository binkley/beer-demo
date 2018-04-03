package hm.binkley.labs.beer;

import org.springframework.data.jpa.repository.JpaRepository;

interface BeerRepository
        extends JpaRepository<Beer, Long> {}
