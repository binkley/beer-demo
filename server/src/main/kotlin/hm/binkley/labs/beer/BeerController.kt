package hm.binkley.labs.beer

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.util.stream.Stream

@RestController
class BeerController(@Autowired private val repository: BeerRepository) {
    @GetMapping("/good-beers")
    @CrossOrigin(origins = ["http://localhost:3000", "http://localhost:5000"])
    fun goodBeers(): Stream<Beer> {
        return repository.findAll().stream().filter { it.quality >= 87 }
    }
}
