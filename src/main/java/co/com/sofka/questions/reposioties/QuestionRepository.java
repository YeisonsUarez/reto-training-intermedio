package co.com.sofka.questions.reposioties;

import co.com.sofka.questions.collections.Question;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface QuestionRepository extends ReactiveCrudRepository<Question, String> {
    Flux<Question> findByUserId(String userId);
    
    @Query("{ id: { $exists: true }}")
    Flux<Question> findAllPaged(final Pageable page);
}
