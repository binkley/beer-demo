package hm.binkley.labs.beer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public final class Beer {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    public Beer(final String name) {
        this.name = name;
    }
}
