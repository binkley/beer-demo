package hm.binkley.labs.beer

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class BeerCommandLineRunner @Autowired constructor(
        private val repository: BeerRepository)
    : CommandLineRunner {
    override fun run(args: Array<String>) {
        repository.save(Beer(null, "Kentucky Brunch Brand Stout", 94))
        repository.save(Beer(null, "Lawnmower", 88))
        repository.save(Beer(null, "Budweiser", 42))
        repository.save(Beer(null, "Coors Lite", 54))
    }
}
