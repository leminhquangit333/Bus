package com.quangminhle.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false, of = "id")
@Entity
@Table(name = "commodity_ticket")
public class CommodityTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;

    @Column(name = "sender_phone")
    private String senderPhone;

    private String receiver;

    @Column(name = "receiver_phone")
    private String receiverPhone;

    private String note;

    private Long price;

    private Integer weight;

    @ManyToOne
    @JoinColumn(name = "scheduce_id")
    private Scheduce scheduce;

    private String departure;

    private String destination;

}
