package helpers

import (
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func getSecretKey() []byte {
	secret := strings.TrimSpace(os.Getenv("SECRET_KEY"))
	if secret == "" {
		secret = "secret-key"
	}
	return []byte(secret)
}

func ResolveRole(email, role string) string {
	if strings.TrimSpace(role) != "" {
		return strings.ToLower(strings.TrimSpace(role))
	}

	lowerEmail := strings.ToLower(strings.TrimSpace(email))
	switch {
	case strings.HasPrefix(lowerEmail, "admin"):
		return "admin"
	case strings.HasPrefix(lowerEmail, "petugas"):
		return "petugas"
	case strings.HasPrefix(lowerEmail, "dokter"):
		return "dokter"
	default:
		return "admin"
	}
}

func GenerateToken(userID uint, role string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"role":    role,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(getSecretKey())
}
