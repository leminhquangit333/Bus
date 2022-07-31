package com.quangminhle.server;

import com.quangminhle.server.entity.Users;
import com.quangminhle.server.repository.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@Slf4j
public class ServerApplication {
    public static void main(String[] args) {
        log.info("<======================start server======================>");
        SpringApplication.run(ServerApplication.class, args);

        log.info("<======================start server complete======================>");
    }
//
//    @Autowired
//    UsersRepository userRepository;
//    @Autowired
//    PasswordEncoder passwordEncoder;
//
//    @Override
//    public void run(String... args) throws Exception {
//        // Khi chương trình chạy
//        // Insert vào csdl một user.
//        Users user = new Users();
//        user.setUserName("admin");
//        user.setPassword(passwordEncoder.encode("toanthong123"));
//        userRepository.save(user);
//        System.out.println(user);
//    }

}
