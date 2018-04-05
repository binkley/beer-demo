package hm.binkley.labs.beer;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Stream;

@RequiredArgsConstructor
@RestController
public final class BeerController {
    private final BeerRepository repository;

    private static boolean isGreat(final Beer beer) {
        return !"Budweiser".equals(beer.getName()) && !"Coors Light"
                .equals(beer.getName());
    }

    @GetMapping("/good-beers")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public Stream<Beer> goodBeers() {
        return repository.findAll().stream().
                filter(BeerController::isGreat);
    }
}
