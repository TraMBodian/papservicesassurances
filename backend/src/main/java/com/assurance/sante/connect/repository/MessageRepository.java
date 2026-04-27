package com.assurance.sante.connect.repository;

import com.assurance.sante.connect.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE " +
           "(m.senderId = :a AND m.receiverId = :b) OR " +
           "(m.senderId = :b AND m.receiverId = :a) " +
           "ORDER BY m.createdAt ASC")
    List<Message> findConversation(@Param("a") Long a, @Param("b") Long b);

    @Query("SELECT m FROM Message m WHERE m.receiverId = :userId AND m.read = false")
    List<Message> findUnreadByReceiver(@Param("userId") Long userId);

    @Query("SELECT DISTINCT CASE WHEN m.senderId = :userId THEN m.receiverId ELSE m.senderId END " +
           "FROM Message m WHERE m.senderId = :userId OR m.receiverId = :userId")
    List<Long> findContactIds(@Param("userId") Long userId);
}
