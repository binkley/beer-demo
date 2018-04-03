package hm.binkley.labs.beer;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

import static java.lang.System.out;

@Component
@RequiredArgsConstructor
public final class BeerCommandLineRunner
        implements CommandLineRunner {
    private final BeerRepository repository;

    @Override
    public void run(final String... args) {
        Stream.of("Kentucky Brunch Brand Stout", "Lawnmower", "Budweiser",
                "Coors Light").
                forEach(name -> repository.save(new Beer(name)));

        repository.findAll().
                forEach(out::println);
    }
}
