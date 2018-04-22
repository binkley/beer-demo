package hm.binkley.labs.beer

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Beer(
        @Id @GeneratedValue val id: Long? = null,
        val name: String,
        val quality: Int)
