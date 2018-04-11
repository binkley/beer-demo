package hm.binkley.labs.beer

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.util.stream.Stream

@RestController
class BeerController {
    private val repository: BeerRepository? = null

    private fun isGreat(beer: Beer): Boolean {
        return "Budweiser" != beer.name && "Coors Light" != beer.name
    }

    @GetMapping("/good-beers")
    @CrossOrigin(origins = ["http://localhost:3000", "http://localhost:5000"])
    fun goodBeers(): Stream<Beer> {
        return repository!!.findAll().stream().filter { isGreat(it) }
    }
}
