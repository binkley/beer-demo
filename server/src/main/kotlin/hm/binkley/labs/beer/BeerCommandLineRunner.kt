package hm.binkley.labs.beer

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.lang.System.out

@Component
class BeerCommandLineRunner @Autowired constructor(
        private val repository: BeerRepository)
    : CommandLineRunner {
    override fun run(args: Array<String>) {
        sequenceOf(
                "Kentucky Brunch Brand Stout",
                "Lawnmower",
                "Budweiser",
                "Coors Light"
        ).forEach { name -> repository.save(Beer(null, name)) }

        repository.findAll().forEach(out::println)
    }
}
