package hm.binkley.labs.beer

import org.springframework.boot.SpringApplication.run
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class BeerApplication

fun main(args: Array<String>) {
    run(BeerApplication::class.java, *args)
}
