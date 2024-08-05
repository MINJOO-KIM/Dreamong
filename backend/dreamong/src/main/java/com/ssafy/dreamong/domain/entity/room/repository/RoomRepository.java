package com.ssafy.dreamong.domain.entity.room.repository;

import com.ssafy.dreamong.domain.entity.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
}