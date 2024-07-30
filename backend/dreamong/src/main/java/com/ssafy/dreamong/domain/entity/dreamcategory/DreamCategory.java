package com.ssafy.dreamong.domain.entity.dreamcategory;

import com.ssafy.dreamong.domain.entity.category.Category;
import com.ssafy.dreamong.domain.entity.dream.Dream;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "dream_category")
public class DreamCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "dream_category_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dream_id")
    private Dream dream;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
